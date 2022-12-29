import React from "react";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "../../store/Products/Products";
import styles from "../styles/Cart.module.css";
import { useCart } from "../../store/Cart/Cart";

const Cart = ({ setModal }) => {
    const item = useCart((state) => state.cart);

    let sum = 0;
    item.map((mapped) => {
        sum += mapped.price;
    });

    let discounted = (sum / 100) * 10;

    let final = sum.toFixed(2) - discounted.toFixed(2);

    let formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(final);

    return (
        <Body>
            <Header>
                <h3>Cart</h3>
                <AiOutlineClose
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setModal(false)}
                />
            </Header>
            {item?.map((cart) => (
                <Content>
                    <div className="thumbnail">
                        <img
                            src={cart.image}
                            alt="Autumn Limited Edition Sneakers"
                        />
                    </div>
                    <div className="details">
                        <p>
                            {cart.title}
                            <br />${cart.price} x {cart.quantity}{" "}
                            <strong>${cart.price * cart.quantity}</strong>
                        </p>
                    </div>
                    <div className="delete">
                        <AiOutlineDelete />
                    </div>
                </Content>
            ))}

            <MiddleContainer>
                <div className={styles.right}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>CART TOTAL</h2>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>Subtotal:</b>$
                            {sum}
                        </div>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>Discount:</b>$
                            {discounted}
                        </div>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>
                                Total: {formatted}
                            </b>
                        </div>
                    </div>
                </div>
            </MiddleContainer>

            <button>Checkout</button>
        </Body>
    );
};
const MiddleContainer = styled.div``;
const Body = styled.div`
    width: 350px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 20%);
    background-color: white;
    position: absolute;
    right: 20px;
    z-index: 100;
    overflow-y: scroll;
    height: 500px;
    button {
        margin: 20px 20px 30px 20px;
        height: 55px;
        width: calc(100% - 40px);
        background-color: hsl(26, 100%, 55%);
        border: none;
        border-radius: 10px;
        color: white;
        font-weight: 700;
        cursor: pointer;
        transition: 100ms ease;
        &:hover {
            background-color: hsl(26, 100%, 55%, 50%);
        }
    }
    @media (max-width: 1340px) {
        right: 0;
        transform: translateX(30%);
    }
    @media (max-width: 769px) {
        left: 0;
        top: calc(100% + 10px);
        width: calc(100% - 20px);
        margin: auto;
        transform: translateX(0%);
        max-width: 350px;
    }
`;

const Header = styled.div`
    border-bottom: solid 1px hsl(223, 64%, 95%);
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

const Content = styled.div`
    padding: 20px;
    line-height: 1.6;
    display: flex;
    align-items: center;
    .thumbnail {
        display: flex;
        align-items: center;
        margin-right: 20px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            cursor: auto;
        }
    }
    .details {
        margin-right: 20px;
    }
`;

export default Cart;
