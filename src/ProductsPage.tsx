import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProduct } from "./ProductsData";
import "url-search-params-polyfill";
import { connect } from "react-redux";
import { IApplicationState } from "./reducer/Store";
import { getProducts } from "./reducer/ProductsActions";
import ProductsList from "./ProductsList";
/* interface IState {
  products: IProduct[];
  search: string;
} */

interface IProps extends RouteComponentProps {
  getProducts: typeof getProducts;
  loading: boolean;
  products: IProduct[];
}

class ProductsPage extends React.Component<IProps> {
  /*   public constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      products: [],
      search: ""
    };
  } */

  /*   public static getDerivedStateFromProps(
    props: RouteComponentProps,
    state: IState
  ) {
    const searchParams = new URLSearchParams(props.location.search);
    const search = searchParams.get("search") || "";
    return {
      products: state.products,
      search
    };
  } */

  public componentDidMount() {
    this.props.getProducts();
    //this.setState({ products });
  }

  public render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const search = searchParams.get("search") || "";
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ProductsList
          search={search}
          products={this.props.products}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.products.productsLoading,
    products: store.products.products
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
