import React, { Fragment } from 'react';
import { Descriptions, Divider, Tag, Progress, Button, Input, Form, Spin } from 'antd';
import styles from './style.less';
import project from '@/pages/admin/project';

const { Item } = Descriptions;
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
};
export default Form.create()(props => {
  const {
    loading,
    report,
    handleEditAssess,
    form: { validateFields, getFieldDecorator },
  } = props;

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (!error) handleEditAssess(value);
    });
  };

  const { projects = '', projectsType = '' } = report;

  const selfAssess = report.selfAssess ? (
    <Descriptions layout="vertical">
      <Item label="个人评价">{report.selfAssess}</Item>
    </Descriptions>
  ) : (
    <Form layout="inline">
      <Form.Item label="个人评价">
        {getFieldDecorator('selfAssess', {
          rules: [
            {
              required: true,
              min: 15,
              message: '请填写至少15字的个人评价',
            },
          ],
        })(<Input.TextArea rows={3} style={{ minWidth: '350px' }} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
  return loading ? (
    <Spin />
  ) : (
    <Fragment>
      <Descriptions title={report.time} column={2}>
        <Item label="一周所做项目">
          {projects.split(',').map((project, index) => (
            <Tag key={index}>{project}</Tag>
          ))}
        </Item>
        <Item label="项目类型">
          {projectsType.split(',').map((project, index) => (
            <Tag key={index}>{project}</Tag>
          ))}
        </Item>
        <Item label="完成比例">
          <Progress type="circle" percent={report.actualPercent} width={80} />
        </Item>
        <Item label="实际工时">{report.actualHours}</Item>
        <Item label="输出物">{report.output}</Item>
      </Descriptions>
      <Divider />
      {selfAssess}
    </Fragment>
  );
});
