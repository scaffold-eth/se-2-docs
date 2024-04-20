---
sidebar_position: 8
---

# TokenSelector

The `TokenSelector` component is a modal that allows users to select a token from a list of supported tokens.

![TokenSelector Example](/img/TokenSelector.png)

## Import

```tsx
import { TokenSelector } from "~~/components/scaffold-eth";
import { Token } from "~~/hooks/scaffold-eth";
```

## Usage

```tsx
let [token, setToken] = useState<Token | undefined>();

<TokenSelector
  onChange={setToken}
  chainId={1}
  suggestedTokens={[
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
  ]}
  button={token =>
    token ? (
      <div class="flex">
        {/* If the user imported the token, it might not have a logo/icon */}
        {token.logoURI && <img src={token.logoURI} alt={token.name} class="w-6 h-6 mr-2" />}
        <span>{token.name}</span>
      </div>
    ) : (
      {/* If no token is selected, show a default message */}
      <span>Select a token</span>
    )
  }
/>;
```

## Props

| Prop                           | Type       | Default Value | Description                                                                                                                                        |
| ------------------------------ | ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId** (optional)         | `number`   | `undefined`   | Chain ID to get tokens for. If not provided, will default to the chain the user is currently connected to, with a fallback of `targetNetworks[0]`. |
| **suggestedTokens** (optional) | `string[]` | `undefined`   | List of token addresses to suggest to the user at the top of the modal.                                                                            |
| **onchange** (optional)        | `function` | `undefined`   | Callback function that is called when the user selects a token.                                                                                    |
| **button** (optional)          | `function` | `undefined`   | Function that returns the contents of the toggle modal button. Defaults to the text "Select a token" if not specified.                             |

The `Token` type is defined like so (which you can import from `~~/hooks/scaffold-eth`):

```tsx
type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};
```
