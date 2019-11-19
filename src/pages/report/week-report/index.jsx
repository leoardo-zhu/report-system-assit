import React from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import Content from './components/ReportContent';
import moment from 'moment';
import styles from './style.less';
import { Row, Col, Card, Spin, DatePicker } from 'antd';
import { connect } from 'dva';

const { WeekPicker } = DatePicker;

@connect(({ weekReport, loading }) => ({
  weekReport,
  loading: loading.effects['weekReport/fetchReport'],
}))
class WeekReport extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'weekReport/fetchReport',
    });
  }

  handleEditAssess = val => {
    const {
      dispatch,
      weekReport: {
        report: { id },
      },
    } = this.props;
    dispatch({
      type: 'weekReport/editAssess',
      payload: {
        ...val,
        id,
      },
    });
  };

  changeDate = (_, date) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'weekReport/changeDate',
      payload: { date },
    });
  };

  render() {
    const {
      loading,
      weekReport: { report, date = null },
    } = this.props;
    const tabs = [
      {
        key: 'weekly',
        tab: (
          <span>
            周报{' '}
            <span
              style={{
                fontSize: 14,
              }}
            ></span>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
        <GridContent>
          <Row gutter={24}>
            <Col lg={4} md={24}>
              <Card bordered={false}>
                <WeekPicker
                  value={moment(date, 'YYYY-w')}
                  onChange={this.changeDate}
                  placeholder="选择周"
                  disabledDate={currentDate => currentDate > moment()}
                />
              </Card>
            </Col>
            <Col lg={20} md={24}>
              <Card bordered={false} tabList={tabs}>
                <Content
                  handleEditAssess={this.handleEditAssess}
                  loading={loading}
                  report={report}
                />
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default WeekReport;
