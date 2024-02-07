import { Token } from '@offsetcarbon/sdk-core';
import { FACTORY_ADDRESS } from '@offsetcarbon/v3-sdk';

import { ChainId, NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chains';

export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(FACTORY_ADDRESS),
  [ChainId.ARBITRUM_SEPOLIA]: FACTORY_ADDRESS,
};

export const QUOTER_V2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xd1d33a24A65e4e5491b27366b5d07C82516C6cA5'),
  [ChainId.ARBITRUM_SEPOLIA]: "0xd1d33a24A65e4e5491b27366b5d07C82516C6cA5"
};

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.ARBITRUM_SEPOLIA]: ""
};

export const UNISWAP_MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x489BAE4A510c337908e400ea35EAfebe7A255F94'),
  [ChainId.ARBITRUM_SEPOLIA]: "0x489BAE4A510c337908e400ea35EAfebe7A255F94"
};

export const SWAP_ROUTER_02_ADDRESSES = (_chainId: number) => {
  return '0x2cF06C1272D72cA84eBA87B9b91843C2b3233929';
};

export const OVM_GASPRICE_ADDRESS =
  '0x420000000000000000000000000000000000000F';
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C';
export const TICK_LENS_ADDRESS = '0x9398c7a347192Ba7b4BDFE05DA1bD5Eb8B4dEd15';
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS =
  '0x97D84a363583Bc295f75ba567eCa4B5192EC2085';
export const V3_MIGRATOR_ADDRESS = '0x61F27EBd4A6625ffF0860A87159d1288B4C10713';
export const MULTICALL2_ADDRESS = '0x489BAE4A510c337908e400ea35EAfebe7A255F94';

export type AddressMap = { [chainId: number]: string };

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(
    additionalNetworks
  ).reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

export const WETH9: {
  [chainId in ChainId]: Token;
} = {
  [ChainId.ARBITRUM_SEPOLIA]: new Token(
    ChainId.ARBITRUM_SEPOLIA,
    '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
    18,
    'WETH',
    'Wrapped Ether'
  ),
};
