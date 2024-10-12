// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

error InvalidTokenAddress();
error ETHNotAccepted();
error InvalidStakeAmountOfZero(uint256 amount);
error InvalidStakeDuration(uint256 duration);
error MaxStakesReached(address staker);
error ExceedsMaxTotalStake(uint256 amount, uint256 totalStaked, uint256 maxTotalStake);
error SlippageTooHigh(uint256 expected, uint256 received);
error VestingNotYetAvailable(uint256 startTime, uint256 currentTime);
error NoNewVestingAvailable(uint256 lastVestingTime, uint256 currentTime);
error NoVestingAmountAvailable();
error InvalidStakeIndex(uint256 index, uint256 totalStakes);
error InvalidNewOwner(address newOwner);

contract CauseStaking is ReentrancyGuard, Ownable, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public immutable causeToken;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 duration;
        uint256 lastVestingTime;
        uint256 vestedAmount;
    }

    mapping(address => Stake[]) private stakes;

    uint256 private constant SECONDS_PER_MONTH = 2_592_000;
    uint256 private constant SECONDS_PER_YEAR = 31_536_000;
    uint256 private constant MIN_DURATION = 12 * SECONDS_PER_MONTH;
    uint256 private constant MAX_DURATION = 36 * SECONDS_PER_MONTH;
    uint256 private constant VESTING_PERCENTAGE = 5;
    uint256 private constant PRECISION = 1e18;

    // uint256 public constant MAX_TOTAL_STAKE = 1_000_000 * 10**18; // 1 million tokens
    uint256 public totalStaked;
    uint256 public constant MAX_STAKES_PER_ADDRESS = 100;

    event Staked(address indexed staker, uint256 amount, uint256 duration, uint256 stakeIndex);
    event Vested(address indexed staker, uint256 amount);

    constructor(address _causeToken)Ownable(msg.sender) {
        if (_causeToken == address(0)) revert InvalidTokenAddress();
        causeToken = IERC20(_causeToken);
    }

    receive() external payable {
        revert ETHNotAccepted();
    }

    function stake(uint256 _amount, uint256 _duration, uint256 _minReceived) external nonReentrant whenNotPaused returns (uint256) {
        if (_amount == 0) revert InvalidStakeAmountOfZero(_amount);
        if (_duration < MIN_DURATION || _duration > MAX_DURATION) revert InvalidStakeDuration(_duration);
        if (stakes[msg.sender].length >= MAX_STAKES_PER_ADDRESS) revert MaxStakesReached(msg.sender);
        // if (totalStaked + _amount > MAX_TOTAL_STAKE) revert ExceedsMaxTotalStake(_amount, totalStaked, MAX_TOTAL_STAKE);

        uint256 stakingAmount = _amount;
        if (stakingAmount < _minReceived) revert SlippageTooHigh(_minReceived, stakingAmount);

        causeToken.safeTransferFrom(msg.sender, address(this), _amount);

        totalStaked += _amount;

        uint256 newStakeIndex = stakes[msg.sender].length;
        stakes[msg.sender].push(Stake({
            amount: stakingAmount,
            startTime: block.timestamp,
            duration: _duration,
            lastVestingTime: block.timestamp,
            vestedAmount: 0
        }));

        emit Staked(msg.sender, stakingAmount, _duration, newStakeIndex);

        return newStakeIndex;
    }

    function vest(uint256 _stakeIndex) external nonReentrant whenNotPaused {
        if (_stakeIndex >= stakes[msg.sender].length) revert InvalidStakeIndex(_stakeIndex, stakes[msg.sender].length);
        
        Stake storage userStake = stakes[msg.sender][_stakeIndex];
        if (block.timestamp < userStake.startTime + userStake.duration) revert VestingNotYetAvailable(userStake.startTime, block.timestamp);

        uint256 monthsSinceLastVesting = (block.timestamp - userStake.lastVestingTime) / SECONDS_PER_MONTH;
        if (monthsSinceLastVesting == 0) revert NoNewVestingAvailable(userStake.lastVestingTime, block.timestamp);

        uint256 vestingAmount = (userStake.amount * VESTING_PERCENTAGE * monthsSinceLastVesting * PRECISION) / (100 * PRECISION);
        vestingAmount = _min(vestingAmount, userStake.amount - userStake.vestedAmount);

        if (vestingAmount == 0) revert NoVestingAmountAvailable();

        userStake.lastVestingTime = block.timestamp;
        userStake.vestedAmount = userStake.vestedAmount + vestingAmount;

        emit Vested(msg.sender, vestingAmount);

        causeToken.safeTransfer(msg.sender, vestingAmount);
    }

    function getStakes(address _staker) external view returns (Stake[] memory) {
        return stakes[_staker];
    }

    function changeOwner(address _newOwner) external onlyOwner {
        if (_newOwner == address(0) || _newOwner == owner()) revert InvalidNewOwner(_newOwner);
        _transferOwnership(_newOwner);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}