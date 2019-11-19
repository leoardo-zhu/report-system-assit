import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Form,
  Select,
  Input,
  Card,
  InputNumber,
  Slider,
  Tooltip,
  Icon,
  DatePicker,
  Modal,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Button from 'antd/es/button/button';
import { connect } from 'dva';
import Prompt from 'umi/prompt';
import moment from 'moment';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 10,
    },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

const initState = {
  doLeave: false,
};

@connect(({ dayReport }) => ({
  dayReport,
}))
class CreateReport extends React.Component {
  state = {
    ...initState,
  };
  handleSubmit = () => {
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields((error, values) => {
      if (error) return;
      dispatch({
        type: 'dayReport/submitReport',
        payload: values,
      });
    });
  };

  handleRouteLeave = () => {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => this.setState({ doLeave: true }),
      onCancel: () => this.setState({ doLeave: false }),
    });

    return this.state.doLeave;
  };

  render() {
    const {
      dayReport: { newReport },
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    return (
      <PageHeaderWrapper title="新建日报" content="这是新建一个日报">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark>
            <Form.Item {...formItemLayout} label="项目名">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    required: true,
                    message: '请填写项目名称',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="项目类型">
              {getFieldDecorator('projectType', {
                rules: [
                  {
                    required: true,
                    message: '请选择项目类型',
                  },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="商业项目">商业项目</Option>
                  <Option value="内部项目">内部项目</Option>
                  <Option value="外包项目">外包项目</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="任务名">
              {getFieldDecorator('task', {
                rules: [
                  {
                    required: true,
                    message: '请填写任务名',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="计划完成比例">
              {getFieldDecorator('planPercent', {
                rules: [
                  {
                    required: true,
                    message: '请选择计划完成比例',
                  },
                ],
              })(
                <Slider
                  marks={{ 0: '0', 20: '20%', 40: '40%', 60: '60%', 80: '80%', 100: '100%' }}
                />,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="计划详细说明">
              {getFieldDecorator('planDetail', {
                rules: [
                  {
                    required: true,
                    message: '请填写计划详细说明',
                  },
                ],
              })(<TextArea autosize={{ minRows: 3 }} autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="输出物">
              {getFieldDecorator('output', {
                rules: [
                  {
                    required: true,
                    message: '请填写输出物',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  计划工作时间&nbsp;
                  <Tooltip title="5-10小时">
                    <Icon type="question-circle-o" style={{ marginRight: 4 }} />
                  </Tooltip>
                </span>
              }
              help="5小时至10小时"
            >
              {getFieldDecorator('planHours', {
                initialValue: 5,
                rules: [
                  {
                    required: true,
                    message: '请填写计划工作时间',
                  },
                ],
              })(<InputNumber min={5} max={10} />)}
              <span className="ant-form-text">小时</span>
            </Form.Item>
            <Form.Item {...formItemLayout} label="风险或问题">
              {getFieldDecorator('question', {
                rules: [
                  {
                    required: true,
                    message: '请填写风险或问题',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="协助部门或人员">
              {getFieldDecorator('assistStaff', {
                rules: [
                  {
                    required: true,
                    message: '请填写协助部门或人员',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="创建时间">
              {getFieldDecorator('startTime', {
                initialValue: moment(),
                rules: [
                  {
                    type: 'object',
                    required: true,
                    message: '请选择创建时间',
                  },
                ],
              })(
                <DatePicker
                  placeholder="请选择时间"
                  disabledDate={current => current < moment().subtract(1, 'days')}
                />,
              )}
            </Form.Item>
            <Form.Item
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(CreateReport);
