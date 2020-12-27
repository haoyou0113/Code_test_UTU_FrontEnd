import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { getChartData } from '../../actions/chartActions';
function LineChart(props) {
  const dispatch = useDispatch();
  const { DateArr, CloseArr, loading } = useSelector(
    (state) => state.chartData
  );

  const data = {
    labels: DateArr,
    datasets: [
      {
        label: 'Price',
        fill: false,
        backgroundColor: 'rgb(112, 157, 226)',
        borderColor: 'rgb(112, 157, 226)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(112, 157, 226)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(112, 157, 226)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: CloseArr,
      },
    ],
  };
  useEffect(() => {
    dispatch(getChartData(props.chartData.currency, props.date));
  }, [props]);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Line
          data={data}
          height={100}
          options={{
            responsive: true,
            title: {
              display: true,
              text: 'Closing Price',
              fontSize: 20,
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'day',
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    labelString: '($)',
                    display: true,
                  },
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                  },
                },
              ],
            },
          }}
        />
      )}
    </>
  );
}

export default LineChart;
