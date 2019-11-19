import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, List, Icon, Avatar } from 'antd';
import { connect } from 'dva';

@connect(({ assessReport }) => assessReport)
class Assess extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'assessReport/fetch',
    });
  }
  render() {
    const { reports } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <PageHeaderWrapper>
        <Card title="经理评价">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 3 }}
            dataSource={reports}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.username}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          ></List>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Assess;
