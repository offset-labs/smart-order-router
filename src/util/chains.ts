import { Ether, NativeCurrency, Token } from '@offsetcarbon/sdk-core';


export enum ChainId {
  ARBITRUM_SEPOLIA = 421614,
}

// WIP: Gnosis, Moonbeam
export const SUPPORTED_CHAINS: ChainId[] = [
  ChainId.ARBITRUM_SEPOLIA,
  // Gnosis and Moonbeam don't yet have contracts deployed yet
];

export const V2_SUPPORTED = [
  ChainId.ARBITRUM_SEPOLIA,
];

export const HAS_L1_FEE = [
  ChainId.ARBITRUM_SEPOLIA,
];

export const NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = [
  ChainId.ARBITRUM_SEPOLIA,
];

export const ID_TO_CHAIN_ID = (id: number): ChainId => {
  switch (id) {
    case 421614:
      return ChainId.ARBITRUM_SEPOLIA;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export enum ChainName {
  ARBITRUM_SEPOLIA = 'arbitrum-sepolia',
}

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = 'ETH',
}
export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.ARBITRUM_SEPOLIA]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
};

export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrencyName } = {
  [ChainId.ARBITRUM_SEPOLIA]: NativeCurrencyName.ETHER,
};

export const ID_TO_NETWORK_NAME = (id: number): ChainName => {
  switch (id) {
    case 421614:
      return ChainName.ARBITRUM_SEPOLIA;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export const CHAIN_IDS_LIST = Object.values(ChainId).map((c) =>
  c.toString()
) as string[];

export const ID_TO_PROVIDER = (id: ChainId): string => {
  switch (id) {
    case ChainId.ARBITRUM_SEPOLIA:
      return process.env.JSON_RPC_PROVIDER_ARBITRUM_SEPOLIA!;
    default:
      throw new Error(`Chain id: ${id} not supported`);
  }
};

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.ARBITRUM_SEPOLIA]: new Token(
    ChainId.ARBITRUM_SEPOLIA,
    '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
    18,
    'WETH',
    'Wrapped Ether'
  ),
};

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WRAPPED_NATIVE_CURRENCY)
      return WRAPPED_NATIVE_CURRENCY[this.chainId as ChainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};
export function nativeOnChain(chainId: number): NativeCurrency {
  if (cachedNativeCurrency[chainId] != undefined)
    return cachedNativeCurrency[chainId]!;
  else cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);

  return cachedNativeCurrency[chainId]!;
}
