import * as React from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { IProduct } from "./ProductsData";
import Product from "./components/Products";

import { connect } from "react-redux";
import { addToBasket } from "./reducer/BasketActions";
import { getProduct } from "./reducer/ProductsActions";
import { IApplicationState } from "./reducer/Store";

type Props = RouteComponentProps<{ id: string }>;

interface IProps extends RouteComponentProps<{ id: string }> {
  addToBasket: typeof addToBasket;
  getProduct: typeof getProduct;
  loading: boolean;
  product?: IProduct;
  added: boolean;
}

interface IState {
  product?: IProduct;
  added: boolean;
  loading: boolean;
}

class ProductPage extends React.Component<IProps> {
  /*   public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true
    };
  } */
  public componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      // const product = await getProduct(id);
      this.props.getProduct(id);
      // const product = products.filter((p) => p.id === id)[0];
      /*  if (product !== null) {
        this.setState({ product, loading: false });
      } */
    }
  }

  private navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  private handleAddClick = () => {
    //   this.setState({ added: true });
    if (this.props.product) {
      this.props.addToBasket(this.props.product);
    }
  };

  public render() {
    const product = this.props.product;
    /*    if (!product) {
      return null;
    } */
    return (
      <div className="page-container">
        <Prompt when={!this.props.added} message={this.navAwayMessage} />
        {product || this.props.loading ? (
          <Product
            loading={this.props.loading}
            product={product}
            inBasket={this.props.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
    getProduct: (id: number) => dispatch(getProduct(id))
  };
};

const mapStateToProps = (store: IApplicationState) => {
  return {
    added: store.basket.products.some((p) =>
      store.products.currentProduct
        ? p.id === store.products.currentProduct.id
        : false
    ),
    basketProducts: store.basket.products,
    loading: store.products.productsLoading,
    product: store.products.currentProduct || undefined
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
