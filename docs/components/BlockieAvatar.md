---
sidebar_position: 8
---

# BlockieAvatar

Show a blockie (bar code profile icon) component for a given public address.

If the address has an ENS avatar linked to it, this avatar will be displayed. Otherwise, a generated blockie will be shown.

![BlockieAvatar Example](/img/BlockieAvatar.png)

If you want more control over styling the blockie, you can directly use [blo](https://github.com/bpierre/blo) (pre-installed in Scaffold-ETH 2) and internally used by `BlockieAvatar` component to get the image URL.

## Import

```ts
import { BlockieAvatar } from "~~/components/scaffold-eth";
```

## Usage

You can check this real usage of `BlockieAvatar` in the [Address component](/components/Address).

```ts
return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
      // highlight-start
        <BlockieAvatar
          address={checkSumAddress}
          ensImage={ensAvatar}
          size={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
        />
      // highlight-end
      </div>
      {disableAddressLink ? (
        <span className={`ml-1.5 text-${size} font-normal`}>{displayAddress}</span>
      ) : targetNetwork.id === hardhat.id ? (
        <span className={`ml-1.5 text-${size} font-normal`}>
          <Link href={blockExplorerAddressLink}>{displayAddress}</Link>
        </span>
      ) : (
        <a
          className={`ml-1.5 text-${size} font-normal`}
          target="_blank"
          href={blockExplorerAddressLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      )}
      // Rest of Address component return code
    </div>
  );
```

## Props

- `address` => The address for which you want to display its blockie. Ensure it's in the `0x___` format.

- `ensImage` => ENS avatar from the ENS linked to the address.

- `size` => Width and Height in pixels (square).
