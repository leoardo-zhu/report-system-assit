import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import router from 'umi/router';
import moment from 'moment';

import StandardTable from './components/StandardTable';

import { connect } from 'dva';
import styles from './style.less';

@connect(({ dayReport, loading }) => ({
  dayReport,
  loading: loading.effects['dayReport/fetchReports'],
}))
class DayReport extends React.Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dayReport/fetchReports',
    });
  }

  handleModalVisable = visible => {
    this.setState({
      modalVisible: visible,
    });
  };

  render() {
    const {
      dispatch,
      loading,
      dayReport: { reports },
    } = this.props;

    const parentMethods = {
      handleModalVisable: this.handleModalVisable,
    };

    return (
      <PageHeaderWrapper content="员工每天需填写的日报">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}></div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => router.push('/report/day/new')}>
                新建
              </Button>
            </div>
            <StandardTable loading={loading} reports={reports} dispatch={dispatch} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DayReport;
