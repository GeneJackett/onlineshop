import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import CouponModal from "./CouponModal";
import CouponRecord from "./CouponRecord";
import UrlLocator from "../../../helpers/UrlLocator";

class CouponsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editCoupon: {
        id: -1,
        couponId: "",
        percentage: 0,
      },
      coupons: [],
    };
  }

  showModal = () => {
    this.setState({
      show: true,
      editCoupon: {
        id: -1,
        couponId: "",
        percentage: 0,
        modalTitle: "Add New Coupon",
      },
    });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.getAllCoupons();
  };

  componentDidMount() {
    this.getAllCoupons();
  }

  getAllCoupons = () => {
    axios
      .get(UrlLocator.getApiUrl("GET_COUPONS"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ coupons: response.data });
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear()
          window.open("/signin", "_self");
        }
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`${UrlLocator.getApiUrl("DELETE_COUPON")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) this.getAllCoupons();
      });
  };

  // fetch item from database and display contents in a modal
  handleEdit = (id) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_COUPON_BY_ID")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data !== null) {
          const coupon = {
            id: response.data.id,
            couponId: response.data.couponId,
            percentage: response.data.percentage,
            modalTitle: "Edit Coupon",
          };
          this.setState({ show: true, editCoupon: coupon });
        }
      });
  };

  render() {
    return (
      <div className="container">
        <CouponModal
          show={this.state.show}
          hideModal={this.hideModal}
          coupon={this.state.editCoupon}
        />

        <Button variant="outline-dark mt-5" onClick={() => this.showModal()}>
          Add New Coupon
        </Button>

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon ID</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.coupons.map((element) => (
              <CouponRecord
                key={element.id}
                element={element}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CouponsTable;
