import { LineChart } from '../components';
import { Table, Modal, Button, DatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataList } from '../actions/dataActions';
function HomeScreen() {
  const dispatch = useDispatch();
  const { datalist, loading } = useSelector((state) => state.tableData);
  const [chartData, setChartData] = useState({});
  const [date, setDate] = useState(1575378000000);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dateFormat = 'YYYY/MM/DD';

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function disabledDate(current) {
    // DatePicker Limitation
    const currentDate = moment(current).format('YYYY-MM-DD');
    return (
      currentDate < moment(1571403600000).format('YYYY-MM-DD') ||
      currentDate > moment(1575378000000).format('YYYY-MM-DD')
    );
  }

  useEffect(() => {
    dispatch(getDataList(date));
  }, [date, dispatch]);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: 'Coin',
      dataIndex: 'currency',
      sorter: (a, b) => a.currency.length - b.currency.length,
    },
    {
      title: '24h',
      dataIndex: 'hours',
      sorter: (a, b) => parseFloat(a.hours) - parseFloat(b.hours),
      render: (record) => (
        <span style={{ color: parseFloat(record) <= 0 ? 'red' : 'green' }}>
          {record}
        </span>
      ),
    },
    {
      title: '7d',
      dataIndex: 'days',
      sorter: (a, b) => parseFloat(a.days) - parseFloat(b.days),
      render: (record) => (
        <span style={{ color: parseFloat(record) <= 0 ? 'red' : 'green' }}>
          {record}
        </span>
      ),
    },
    {
      title: '1m',
      dataIndex: 'months',
      sorter: (a, b) => parseFloat(a.months) - parseFloat(b.months),
      render: (record) => (
        <span style={{ color: parseFloat(record) <= 0 ? 'red' : 'green' }}>
          {record}
        </span>
      ),
    },
    {
      title: 'Volumes',
      dataIndex: 'Volume',
      sorter: (a, b) =>
        parseFloat(a.Volume.substr(1)) - parseFloat(b.Volume.substr(1)),
      align: 'right',
    },
    {
      title: 'MktCap',
      dataIndex: 'MktCap',
      sorter: (a, b) =>
        parseFloat(a.MktCap.substr(1)) - parseFloat(b.MktCap.substr(1)),
      align: 'right',
    },
    {
      title: 'Last 30 Days',
      dataIndex: 'chart',
      align: 'right',
      render: (text, record, index) => (
        <Button
          type='primary'
          onClick={() => {
            showModal();
            setChartData({
              currency: record.currency,
            });
          }}
        >
          Check Chart
        </Button>
      ),
    },
  ];

  return (
    <div>
      <DatePicker
        defaultValue={moment(date)}
        disabledDate={disabledDate}
        onChange={(date, dateString) => {
          setDate(moment(dateString).format('x'));
        }}
        format={dateFormat}
        style={{ margin: 20 }}
      />

      <Table
        columns={columns}
        dataSource={datalist}
        size='middle'
        loading={loading}
        scroll={{ x: 1300 }}
      />

      <Modal
        visible={isModalVisible}
        width={'80vw'}
        footer={null}
        onCancel={handleCancel}
      >
        <LineChart chartData={chartData} date={date} />
      </Modal>
    </div>
  );
}

export default HomeScreen;
