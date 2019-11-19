import React, { Fragment } from 'react';
import { PageHeaderWrapper, RouteContext, GridContent } from '@ant-design/pro-layout';
import classNames from 'classnames';
import styles from './index.less';
import {
  Descriptions,
  Statistic,
  Card,
  Steps,
  Tooltip,
  Icon,
  Divider,
  Button,
  Modal,
  message,
  Form,
  Input,
  InputNumber,
  Slider,
  Progress,
} from 'antd';

import { connect } from 'dva';
import { router } from 'umi';

const { Step } = Steps;

const statusMap = ['驳回', '审核中', '审核通过', '进行中', '完成'];
const buttonMap = ['重新编辑', '', '启动', '完成'];
class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      managerName: props.managerName,
      percent: 0,
      modalVisible: false,
    };
  }
  componentDidMount() {
    const { dispatch, dayReport } = this.props;
    if (dayReport.index) return;
    dispatch({
      type: 'dayReport/fetchReports',
    });
  }

  handleStart = () => {
    const {
      dispatch,
      location,
      dayReport: { reports },
    } = this.props;
    const index = location.query.index;
    const report = reports[index];
    if (report.status && report.status != 3) {
      report.status += 1;

      dispatch({
        type: 'dayReport/changeStatus',
        payload: {
          index,
          report,
        },
      });
      message.success('启动成功！');
      return;
    } else if (report.status == 3) {
      this.setState({ modalVisible: true });
      return;
    }

    // router.push('/report/day')
  };

  finish = () => {
    const {
      dispatch,
      location,
      dayReport: { reports },
      form: { validateFields },
    } = this.props;
    const index = location.query.index;
    const report = reports[index];
    report.status += 1;

    validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: 'dayReport/updateReport',
        payload: {
          index,
          report: {
            ...report,
            ...values,
          },
        },
      });
      this.setState({ modalVisible: false });
    });
  };

  urgeManager = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dayReport/urgeManager',
    });
  };

  render() {
    const { modalVisible, managerName, percent } = this.state;
    const initIndex = this.props.location.query.index;
    const {
      dayReport: { reports = [], index = initIndex },
      form: { getFieldDecorator },
    } = this.props;
    const report = reports[index] || {};
    const { status } = report;

    const steps = [
      {
        title: '创建日报',
        description: (
          <div className={classNames(styles.textSecondary, styles.stepDescription)}>
            <>
              黄龙
              <Icon
                type="dingding-o"
                style={{
                  marginLeft: 8,
                }}
              />
            </>
            <div>2016-12-12 12:32</div>
          </div>
        ),
      },
      {
        title: status == 0 ? '驳回' : '审核中',
        description: (
          <div className={styles.stepDescription}>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              <span>{managerName} 经理</span>
              <Icon
                type="dingding-o"
                style={{
                  marginLeft: 8,
                }}
              />
            </div>
            {status < 2 ? (
              <div>
                {status == 0 ? (
                  <Tooltip title={report.rejectText}>
                    <a href="javascript:;">查看原因</a>
                  </Tooltip>
                ) : (
                  <a onClick={this.urgeManager}>催一下</a>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        ),
      },
      {
        title: '审核通过',
        description: report.completeTime,
      },
    ];

    const extra = (
      <div className={styles.moreInfo}>
        <Statistic title="状态" value={statusMap[status]} />
      </div>
    );
    const description = (
      <RouteContext.Consumer>
        {({ isMobile }) => (
          <Descriptions className={styles.headerList} column={isMobile ? 1 : 2}>
            <Descriptions.Item label="创建人">黄龙</Descriptions.Item>
            <Descriptions.Item label="项目名">{report.projectName}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{report.dailyReportTime}</Descriptions.Item>
            <Descriptions.Item label="输出物">{report.output}</Descriptions.Item>
          </Descriptions>
        )}
      </RouteContext.Consumer>
    );

    let action = null;
    if (status != 1 && status != 4) {
      action = (
        <Button
          type={status ? 'primary' : 'danger'}
          onClick={this.handleStart}
          style={{
            marginRight: 8,
          }}
        >
          {buttonMap[status]}
        </Button>
      );
    }

    return (
      <PageHeaderWrapper
        title={`单号：${this.props.match.params.id}`}
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
      >
        <GridContent>
          <Card
            title="审核进度"
            style={{
              marginBottom: 24,
            }}
          >
            <Steps current={status < 2 ? 1 : 2} status={status == 0 ? 'error' : 'process'}>
              {steps.map((step, index) => (
                <Step key={index} title={step.title} description={step.description} />
              ))}
            </Steps>
          </Card>

          <Card
            title="日报详细信息"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Descriptions
              style={{
                marginBottom: 24,
              }}
            >
              <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
              <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
              <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
              <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
              <Descriptions.Item label="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="信息组"
            >
              <Descriptions.Item label="某某数据">725</Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
              <Descriptions.Item
                label={
                  <span>
                    某某数据
                    <Tooltip title="数据说明">
                      <Icon
                        style={{
                          color: 'rgba(0, 0, 0, 0.43)',
                          marginLeft: 4,
                        }}
                        type="info-circle-o"
                      />
                    </Tooltip>
                  </span>
                }
              >
                725
              </Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
            </Descriptions>
            <h4
              style={{
                marginBottom: 16,
              }}
            >
              信息组
            </h4>
            <Card type="inner" title="多层级信息组">
              <Descriptions
                style={{
                  marginBottom: 16,
                }}
                title="组名称"
              >
                <Descriptions.Item label="负责人">林东东</Descriptions.Item>
                <Descriptions.Item label="角色码">1234567</Descriptions.Item>
                <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
                <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                <Descriptions.Item label="描述">
                  这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                </Descriptions.Item>
              </Descriptions>
              <Divider
                style={{
                  margin: '16px 0',
                }}
              />
              <Descriptions
                style={{
                  marginBottom: 16,
                }}
                title="组名称"
                column={1}
              >
                <Descriptions.Item label="学名">
                  Citrullus lanatus (Thunb.) Matsum. et
                  Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                </Descriptions.Item>
              </Descriptions>
              <Divider
                style={{
                  margin: '16px 0',
                }}
              />
              <Descriptions title="组名称">
                <Descriptions.Item label="负责人">付小小</Descriptions.Item>
                <Descriptions.Item label="角色码">1234568</Descriptions.Item>
              </Descriptions>
            </Card>
          </Card>

          <Modal
            destroyOnClose
            visible={modalVisible}
            title="完成情况"
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={this.finish}
          >
            <Form>
              <Form.Item label="实际完成时间">
                {getFieldDecorator('actualHours', {
                  initialValue: 0,
                  rules: [
                    {
                      required: true,
                      message: '请填写实际完成时间',
                    },
                  ],
                })(
                  <InputNumber
                    formatter={val => `${val}小时`}
                    parser={val => val.replace('小时', '')}
                  />,
                )}
              </Form.Item>
              <Form.Item label="实际完成比例">
                {getFieldDecorator('actualPercent', {
                  rules: [
                    {
                      required: true,
                      message: '请填写实际完成比例',
                    },
                  ],
                })(<Slider onChange={percent => this.setState({ percent })} />)}
                <Progress type="circle" percent={percent} />
              </Form.Item>
            </Form>
          </Modal>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ dayReport, user }) => ({
  dayReport,
  managerName: user.currentUser.managerName,
}))(Form.create()(Detail));
