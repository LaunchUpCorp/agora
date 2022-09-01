import { css } from "@emotion/css";
import * as theme from "../theme";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { NounResolvedName } from "./NounResolvedName";
import { NounGridChildren } from "./NounGrid";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { PageHeaderFragment$key } from "./__generated__/PageHeaderFragment.graphql";
import { usePrimaryAccount } from "./EthersProviderProvider";

type Props = {
  accountFragment: PageHeaderFragment$key;
};

export function PageHeader({ accountFragment }: Props) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        width: ${theme.maxWidth["6xl"]};
        margin: ${theme.spacing["8"]} auto;
        padding: 0 ${theme.spacing["4"]};
        justify-content: space-between;
      `}
    >
      <Link
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
        to="/"
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            gap: ${theme.spacing["4"]};
          `}
        >
          <img alt="logo" src={logo} />

          <span
            className={css`
              font-size: ${theme.fontSize.sm};
              color: ${theme.colors.gray["700"]};
            `}
          >
            Nouns Agora
          </span>
        </div>
      </Link>

      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: ${theme.spacing["3"]};
        `}
      >
        <Link
          to="/create"
          className={css`
            border-radius: ${theme.borderRadius.lg};
            border-width: ${theme.spacing.px};
            padding: ${theme.spacing["1"]} ${theme.spacing["2"]};
            color: ${theme.colors.gray["200"]};
            background: ${theme.colors.black};

            :hover {
              background: ${theme.colors.gray["800"]};
            }
          `}
        >
          Create
        </Link>
        <OwnedNounsPanel accountFragment={accountFragment} />
      </div>
    </div>
  );
}

type OwnedNounsPanelProps = {
  accountFragment: PageHeaderFragment$key;
};

function OwnedNounsPanel({ accountFragment }: OwnedNounsPanelProps) {
  const address = usePrimaryAccount();

  const account = useFragment(
    graphql`
      fragment PageHeaderFragment on Account {
        nouns {
          id
          ...NounImageFragment
        }
      }
    `,
    accountFragment
  );

  return (
    <div
      className={css`
        border-color: ${theme.colors.gray["300"]};
        border-width: ${theme.spacing.px};
        border-radius: ${theme.borderRadius.lg};
        box-shadow: ${theme.boxShadow.md};

        display: flex;
        flex-direction: row;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          gap: ${theme.spacing["1"]};
          align-items: center;

          padding: ${theme.spacing["1"]} ${theme.spacing["2"]};
        `}
      >
        <NounGridChildren
          count={4}
          nouns={account.nouns}
          imageSize={"5"}
          overflowFontSize={"sm"}
        />
      </div>

      <div
        className={css`
          height: 100%;
          width: ${theme.spacing.px};
          background: ${theme.colors.gray["300"]};
        `}
      />

      <div
        className={css`
          padding: ${theme.spacing["1"]} ${theme.spacing["2"]};
        `}
      >
        <NounResolvedName address={address} />
      </div>
    </div>
  );
}