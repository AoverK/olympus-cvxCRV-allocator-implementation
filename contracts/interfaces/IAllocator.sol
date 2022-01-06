// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

interface IAllocator {
    // Should have deposit/withdraw methods (interfaces aren't standardized)
    /* function getReward() external;

    function getReward(address _address, bool _bool) external;
 */
    function getReward() external;
    function stakeAll() external;

    function stake(uint256 _amount) external;
}