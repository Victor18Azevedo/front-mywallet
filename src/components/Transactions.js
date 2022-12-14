import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  incomingColor,
  lightTextColor,
  outgoingColor,
  textColor,
} from "../constants/colors";
import { BASE_URL } from "../constants/urls";
const Transactions = function ({
  transactions,
  balance,
  userData,
  getTransactions,
}) {
  const isIncoming = function ({ type, balance }) {
    if (type === "incoming" || balance >= 0) {
      return true;
    }
    return false;
  };

  const deleteTransaction = function (id) {
    axios
      .delete(`${BASE_URL}/transactions/${id}`, userData.requestConfig)
      .then((res) => {
        getTransactions();
      })

      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data);
        }
      });
  };

  return (
    <TransactionsStyle>
      <div className='transactions-list'>
        {transactions.map((t) => (
          <Transaction key={t._id}>
            <div className='transaction'>
              <div className='box-text'>
                <span className='transaction-date'>
                  {dayjs(t.date).format("DD/MM")}
                </span>
                <span className='transaction-text'>{t.description}</span>
              </div>
              <div className='box-value'>
                <Value valueColor={isIncoming({ type: t.type })}>
                  {t.value}
                </Value>
                <span
                  className='transaction-delete'
                  onClick={() => deleteTransaction(t._id)}
                >
                  X
                </span>
              </div>
            </div>
          </Transaction>
        ))}
      </div>
      <div className='balance'>
        <span className='balance-text'>Saldo</span>
        <Value valueColor={isIncoming({ balance })}>{balance}</Value>
      </div>
    </TransactionsStyle>
  );
};

export default Transactions;

const TransactionsStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .transactions-list {
    padding-bottom: 10px;
    overflow: auto;
  }
  span {
    color: ${textColor};
    font-size: 16px;
    line-height: 32px;
  }
  .balance {
    box-shadow: 0 0 10px #222;
    border-radius: 5px;
    font-size: 17px;
    width: 100%;
    padding: 5px 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .balance-text {
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .balance-value {
    font-size: 17px;
    font-weight: 400;
  }
  .value--incoming {
    color: ${incomingColor};
  }
  .value--outgoing {
    color: ${outgoingColor};
  }
`;

const Transaction = styled.div`
  span {
    color: ${textColor};
    font-size: 16px;
    line-height: 32px;
  }
  .transaction {
    display: flex;
    justify-content: space-between;
  }
  .transaction-date {
    color: ${lightTextColor};
  }
  .transaction-delete {
    color: ${lightTextColor};
    padding: 0 10px;
    line-height: 32px;
    &:hover {
      cursor: pointer;
    }
  }
  .transaction-text {
    padding-left: 10px;
  }
  .box-text {
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-value {
    display: inline-block;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 32px;
  }
`;

const Value = styled.div`
  display: inline-block;
  line-height: 32px;
  color: ${(props) => (props.valueColor ? incomingColor : outgoingColor)};
`;
