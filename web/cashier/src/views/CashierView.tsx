import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { configure } from 'react-hotkeys';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';
import { clearPunchedItems, createOrder, punchItem, setBarcode } from '../api/cashier';
import { TCreateOrderData } from '../api/cashier/types';
import { popToast } from '../api/toast';
import { ActionButton, ActionContainer } from '../components/Button';
import SearchField from '../components/fields/SearchField';
import OrderSuccess from '../dialogs/cashier/OrderSuccess';
import Payment from '../dialogs/cashier/Payment';
import { ShowShortcut } from '../dialogs/common';
import InventoryTable from '../layouts/table/InventoryTable';
import PurchaseTable from '../layouts/table/PurchaseTable';
import { useCashrContext } from '../providers/cashier';
import { useDialog } from '../providers/dialog';

const Container = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  display: flex;
  width: 0; // 20px
  flex-direction: column;
  margin-right: 0px;
  > .inventoryTable {
    width: 100%;
  }
  > .productInfo {
    width: 100%;
    > .productName {
      background-color: #F2F2F2;
      padding: 8px;
      border-radius: 4px;
      font-size: 7px;
      width: 75%;
      height: 25px;
      box-sizing: border-box;
    }
    > .productCode {
      font-size: 8px;
    }
    > .description {
      font-size: 8px
    }
    > .price {
      font-size: 8px;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  width: 65%;
  border: 1px solid red;
  height: calc(100vh - 100px);
  flex-direction: column;
  > .totalPricing {
    width: 100%;
    > h2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 50px;
      padding-bottom: 30px;
      border-bottom: 1px solid;
    }
  }
  > .purchaseTable {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    float: unset;
    display: flex;
  }
  > hr {
    margin: 15px 0;
    border-bottom: 1px solid #000;
    background: transparent;
    color: transparent;
  }
`;

const StyledActionContainer = styled(ActionContainer)`
  align-items: flex-end;
  width: 32%;
`;

const CashierView: FunctionComponent<RouteComponentProps> = () => {
    const [openDialog, closeDialog] = useDialog();
    const [totalPrice, setTotalPrice] = useState(0);
    const { cashrStore: store, cashrDispatch: dispatch } = useCashrContext();
    const sOpenedRef = useRef(false);
    const pItemsRef = useRef(store.purchasedItems);
    pItemsRef.current = store.purchasedItems;
    sOpenedRef.current = false;

    const showShortcuts = () => {
      if (!sOpenedRef.current) {
        openDialog({
          children: <ShowShortcut />
        });
      } else {
        closeDialog();
      }
      sOpenedRef.current = !sOpenedRef.current;
    };

    useHotkeys('alt+k', showShortcuts);

    useEffect(() => {
      if (store.barcode.code !== '') {
        punchItem({productCode: store.barcode.code}, { cashier: dispatch, toast: store.toastDispatcher });
      }
    }, [store.barcode]);

    useEffect(() => {
      if (store.punchedItems.length > 0) {
        const totalPrice = store.punchedItems.map(({price}) => parseInt(price, 10)).reduce((a,b) => a + b);
        setTotalPrice(totalPrice);
      } else {
        setTotalPrice(0);
      }
    }, [store.punchedItems]);

    useEffect(() => {
      return () => {
        setBarcode('', dispatch);
      }
    }, []);

    useEffect(() => {
      const { pop } = store.toastInfo;
      if(pop) popToast(store.toastInfo, store.toastDispatcher);
    }, [store.toastInfo]);

    const handlePayment = (o: TCreateOrderData) => (p: number) => {
      createOrder({...o, paidAmt: p }, { cashier: dispatch, toast: store.toastDispatcher });
      closeDialog();
      setTimeout(() => openDialog({
        children: <OrderSuccess onClose={closeDialog} />
      }), 1000);
    }

    const handleCreateOrder = () => {
      const order = {
        items: pItemsRef.current.map(({ pqty, itemId }) => ({ itemId, qty: pqty })),
        paidAmt: 0,
      }

      openDialog({
        children: <Payment onPayment={handlePayment(order)} onClose={closeDialog} />
      });

    };

    useHotkeys('alt+Enter', handleCreateOrder);

    const handleReset = () => {
      clearPunchedItems({cashier: dispatch, toast: store.toastDispatcher});
    }

    const { name, productCode, description, price } = store.currentPunchedItem;

    return (
      <Container>
        <LeftSection>
          <MetaSection>

          </MetaSection>
          {/* <div className="productInfo">
            <h4 className="productName">{name}</h4>
            <p className="productCode"><strong>Product Code: </strong> {productCode}</p>
            <p className="description"><strong>Description: </strong> {description}</p>
            <p className="price"><strong>Points: </strong> {price} pts</p>
          </div> */}
          {/* <SearchSection>
            <SearchField onChange={(s) => {}}/>
            <hr/>
          </SearchSection> */}
          {/* <div className="inventoryTable">
            <InventoryTable />
          </div> */}
        </LeftSection>
        <RightSection>
          <div className="totalPricing">
            <h2><span>Total:</span> <span>{totalPrice} pts</span></h2>
          </div>
          <div className="purchaseTable">
            <PurchaseTable />
            <StyledActionContainer>
              <ActionButton onClick={handleReset}>Reset</ActionButton>
              <ActionButton layout="fill" onClick={handleCreateOrder}>Complete Order</ActionButton>
            </StyledActionContainer>
          </div>
        </RightSection>
      </Container>
    )
};

export default CashierView;
