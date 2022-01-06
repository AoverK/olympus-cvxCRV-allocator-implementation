// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

interface IAllocator {
    // Should have deposit/withdraw methods (interfaces aren't standardized)
    function getReward() external;

    function getReward(uint256 _value, bool _bool) external;
}