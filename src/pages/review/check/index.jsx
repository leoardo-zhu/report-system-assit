import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Table, Popconfirm, message, Modal, Form, Input } from 'antd';
import styles from './style.less';
import { connect } from 'dva';

const { Column } = Table;

const pageSize = 5;

@connect(({ checkReport, loading }) => ({
  checkReport,
  loading: loading.models.checkReports,
}))
class Check extends React.Component {
  state = {
    current: 1,
    modalVisible: false,
    rejectReport: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'checkReport/fetchReports',
    });
  }

  changeState = (status, id, index) => {
    const { dispatch } = this.props;
    const { current } = this.state;
    if (status) {
      dispatch({
        type: 'checkReport/changeStatus',
        payload: {
          id,
          status,
          index: (current - 1) * pageSize + index,
        },
      });
    } else {
      this.setState({
        modalVisible: true,
        rejectReport: { id, status, index },
      });
    }
  };

  handleSubmit = () => {
    const { form, dispatch } = this.props;
    const { rejectReport } = this.state;
    form.validateFields((err, rejectText) => {
      if (err) return;
      form.resetFields();
      dispatch({
        type: 'checkReport/changeStatus',
        payload: {
          ...rejectReport,
          ...rejectText,
        },
      });
      this.setState({ modalVisible: false });
    });
  };

  render() {
    const {
      loading,
      checkReport: { checkReports = [] },
      form: { getFieldDecorator },
    } = this.props;
    const { modalVisible } = this.state;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value={`${checkReports.length}个待审核`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>
          <Card
            title="待审核的日报"
            bordered={false}
            className={styles.listCard}
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
          >
            <Table
              dataSource={checkReports}
              scroll={{ x: 1400 }}
              pagination={{ pageSize }}
              loading={loading}
              onChange={({ current }) => this.setState({ current })}
            >
              <Column title="姓名" dataIndex="username" align="center" fixed="left" width={80} />
              <Column
                title="项目名"
                dataIndex="projectName"
                align="center"
                fixed="left"
                width={100}
              />
              <Column title="项目类型" dataIndex="projectType" align="center" />
              <Column title="任务名" dataIndex="task" />
              <Column
                title="计划完成比例"
                dataIndex="planPercent"
                align="center"
                render={val => `${val}%`}
              />
              <Column title="计划详细说明" dataIndex="planDetail" align="center" />
              <Column title="输出物" dataIndex="output" align="center" />
              <Column
                title="计划工作时间"
                dataIndex="planHours"
                align="center"
                render={val => `${val} 小时`}
              />
              <Column title="风险或问题" dataIndex="question" align="center" />
              <Column title="协助部门或人员" dataIndex="assistStaff" align="center" />
              <Column title="日报时间" dataIndex="dailyReportTime" align="center" />
              <Column
                title="操作"
                dataIndex="action"
                fixed="right"
                align="center"
                width={100}
                render={(_, { key }, index) => (
                  <Popconfirm
                    title="是否给予通过"
                    onConfirm={() => this.changeState(2, key, index)}
                    onCancel={() => this.changeState(0, key, index)}
                    okText="通过"
                    cancelText="不通过"
                  >
                    <a href="javascript:;">操作</a>
                  </Popconfirm>
                )}
              />
            </Table>
          </Card>
          <Modal
            destroyOnClose
            title="驳回信息"
            visible={modalVisible}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ modalVisible: false })}
          >
            <Form.Item
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 15,
              }}
              label="驳回信息"
            >
              {getFieldDecorator('rejectText', {
                rules: [
                  {
                    required: true,
                    message: '请输入至少五个字符的驳回信息！',
                    min: 5,
                  },
                ],
              })(<Input.TextArea placeholder="请输入" />)}
            </Form.Item>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Check);
