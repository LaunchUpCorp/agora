import { icons } from "../../icons/icons";
import { useCallback, useState } from "react";
import { css } from "@emotion/css";
import * as theme from "../../theme";
import { Dropdown } from "./Dropdown";
import { formSectionHeadingStyle } from "./PastProposalsFormSection";

type IssueTypeDefinition = {
  key: string;
  title: string;
  icon: keyof typeof icons;
};

const issueDefinitions: IssueTypeDefinition[] = [
  {
    title: "Proliferation",
    key: "proliferation",
    icon: "speakerCone",
  },
  {
    title: "Treasury management",
    key: "treasury",
    icon: "piggyBank",
  },
  {
    title: "Builder funding",
    key: "funding",
    icon: "measure",
  },
];

type IssueState = {
  type: string;
  value: string;
};

function initialIssueState(type: string): IssueState {
  return {
    type,
    value: "",
  };
}

export const formSectionContainerStyles = css`
  padding: ${theme.spacing["8"]} ${theme.spacing["6"]};
  border-bottom-width: ${theme.spacing.px};
  border-color: ${theme.colors.gray["300"]};
`;

export function TopIssuesFormSection() {
  const [topIssues, setTopIssues] = useState<IssueState[]>(() => [
    initialIssueState("treasury"),
    initialIssueState("proliferation"),
  ]);

  const addIssue = useCallback(
    (selectionKey: string) => {
      setTopIssues((lastIssues) => [
        ...lastIssues,
        initialIssueState(selectionKey),
      ]);
    },
    [setTopIssues]
  );

  return (
    <div className={formSectionContainerStyles}>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: space-between;
          gap: ${theme.spacing["4"]};
        `}
      >
        <h3 className={formSectionHeadingStyle}>Views on top issues</h3>

        <Dropdown
          title="+ Add a new issue"
          items={issueDefinitions.map((def) => ({
            selectKey: def.key,
            title: def.title,
          }))}
          onItemClicked={addIssue}
        />
      </div>

      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin-top: ${theme.spacing["6"]};
          gap: ${theme.spacing["4"]};
        `}
      >
        {topIssues.map((issue, index) => {
          const issueDef = issueDefinitions.find(
            (needle) => issue.type === needle.key
          )!;

          return (
            <div
              key={index}
              className={css`
                display: flex;
                flex-direction: row;
                gap: ${theme.spacing["2"]};
                align-items: center;
              `}
            >
              <div
                className={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: ${theme.spacing["10"]};
                  height: ${theme.spacing["10"]};
                  box-shadow: ${theme.boxShadow.md};
                  border-radius: ${theme.borderRadius.md};
                  padding: ${theme.spacing["2"]};
                  background: #fbfbfb;
                  border: 1px solid #ebebeb;
                `}
              >
                <img src={icons[issueDef.icon]} alt={issueDef.title} />
              </div>

              <input
                className={css`
                  flex: 1;
                  ${sharedInputStyle};
                `}
                type="text"
                placeholder={`On ${issueDef.title.toLowerCase()}, I believe...`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const sharedInputStyle = css`
  background: ${theme.colors.gray["200"]};
  outline: none;
  padding: ${theme.spacing["2"]} ${theme.spacing["3"]};
  box-shadow: ${theme.boxShadow.inner};
  border-radius: ${theme.borderRadius.md};
`;
