import * as React from "react";

/* interface IProps {
  headings: string[];
} */

interface ITabProps {
  name: string;
  initialActive?: boolean;
}
interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string) => void;
}
interface IState {
  activeName: string;
}

const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, IState> {
  private handleTabClick = (name: string) => {
    this.setState({ activeName: name });
  };

  /*   private handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const li = e.target as HTMLLIElement;
    const heading: string = li.textContent ? li.textContent : "";
    this.setState({ activeName: heading });
  }; */
  public static Tab: React.FC<ITabProps> = (props) => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.children}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;
