import * as React from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { getProduct, IProduct, products } from "./ProductsData";
import Product from "./components/Products";

type Props = RouteComponentProps<{ id: string }>;

interface IState {
  product?: IProduct;
  added: boolean;
  loading: boolean;
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true
    };
  }
  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = await getProduct(id);
      // const product = products.filter((p) => p.id === id)[0];
      if (product !== null) {
        this.setState({ product, loading: false });
      }
    }
  }

  private navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  private handleAddClick = () => {
    this.setState({ added: true });
  };

  public render() {
    const product = this.state.product;
    if (!product) {
      return null;
    }
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product || this.state.loading ? (
          <Product
            loading={this.state.loading}
            product={product}
            inBasket={this.state.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
