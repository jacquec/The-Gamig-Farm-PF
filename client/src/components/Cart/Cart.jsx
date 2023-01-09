import React, { useState, useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
} from "react-bootstrap";
import { removeFromCart } from "../../redux/actions";
import Carrito from "../Assets/cart.png";
import { CartContext } from "../../context/CartContext/CartContext";

const Cart = () => {
  //   const items = useSelector(state => state.cart.items);
  // const items = [];
  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { cart, addToCart, removeFromCart, getItemQuantity } =
    useContext(CartContext);

  // const handleRemove = (id) => {
  //   dispatch(removeFromCart(id));
  // };

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <div className="cart">
      <Button variant="" class="btn btn float-right" onClick={handleShow}>
        {" "}
        <img src={Carrito} alt="imagen" class="img-fluid" />
      </Button>
      <Offcanvas show={show} onHide={handleHide} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Tu carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Imagen</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        style={{
                          width: "125px",
                          height: "75px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td>{item.quantity}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>Eliminar {item.name} del carrito</Tooltip>
                        }
                      >
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          x
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total</td>
                  <td>
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
