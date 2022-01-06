// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import "./interfaces/ITreasury.sol";
import "./interfaces/IAllocator.sol";
import "./interfaces/IERC20.sol";
import "./libraries/SafeERC20.sol";

interface IcvxCRVRewardDistributorV1 {

    /**
     * @notice Returns the earned rewards for an address
     */
    function earned(address _address) external view returns (uint256);

    /**
     * @notice Returns the rewards for an address
     */
    function getReward() external view returns (uint256);

    /**
     * @notice Returns the rewards for an address
     */
    /* function getReward(address _address, bool _bool) external view returns (uint256); */

    /**
     * @notice Returns the rewards for an address
     */
    function balanceOf(address _address) external view returns (uint256);
}

contract  CvxCRVAllocator is Initializable, OwnableUpgradeable {
    using SafeERC20 for IERC20;
    using SafeMathUpgradeable for uint256;

    /* ======== STATE VARIABLES ======== */
    /* !!!! UPGRADABLE CONTRACT !!!! */
    /* NEW STATE VARIABLES MUST BE APPENDED TO END */

    ITreasury public treasury;
    IERC20 public cvxCRV; // $cvxCRV token
    IcvxCRVRewardDistributorV1 public cvxCRVRewardDistributorV1;

    // uint256 public totalValueDeployed; // cvxCRV isn't a reserve token, so will always be 0
    uint256 public totalAmountDeployed;

    /* ======== INITIALIZER ======== */
    function initialize(
        address _treasury,
        address _cvxCRV,
        address _cvxCRVRewardDistributorV1
    ) public initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();

        require(_treasury != address(0), "zero treasury address");
        treasury = ITreasury(_treasury);

        require(_cvxCRV != address(0), "zero cvxCRV address");
        cvxCRV = IERC20(_cvxCRV);

        require(_cvxCRVRewardDistributorV1 != address(0), "zero cvxCRVDistributorV1 address");
        cvxCRVRewardDistributorV1 = IcvxCRVRewardDistributorV1(_cvxCRVRewardDistributorV1);

        totalAmountDeployed = 0;
    }

    /* ======== POLICY FUNCTIONS ======== */

    
    /**
     * @notice Transfer cvxCRV earned from staking
     * @param _address address
     * @param _bool bool
     */
   /*  function getReward(address _address, bool _bool) external onlyOwner {
        cvxCRVRewardDistributorV1.getReward(address(_address), _bool);
    } */
/**
     * @notice Transfer cvxCRV earned from staking
     */
    function getReward() external {
        return cvxCRVRewardDistributorV1.getReward();
    }
    
    /**
     * @notice Stake a set amount of cvxCRV
     */
    function stake(uint256 _amount) external onlyOwner {
        cvxCRVRewardDistributorV1.stake(_amount);
    }

    /**
     * @notice Stake all cvxCRV
     */
    function stakeAll() external onlyOwner {
         cvxCRVRewardDistributorV1.stakeAll();
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "zero treasury address");
        treasury = ITreasury(_treasury);
    }

    /* ======== VIEW FUNCTIONS ======== */

    function getBalance() public view returns (uint256) {
        return cvxCRVRewardDistributorV1.balanceOf(address(this));
    }

    function getRewardsEarned() public view returns (uint256) {
        return cvxCRVRewardDistributorV1.earned(address(this));
    }
}