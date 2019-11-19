import React from 'react';
import { Table, Badge } from 'antd';
import { Link, router } from 'umi';

const { Column } = Table;

const statusMap = ['error', 'processing', 'success', 'warning', 'default'];
const status = ['驳回', '审核中', '审核通过', '进行中', '已完成'];

const pageSize = 5;
class StandardTable extends React.Component {
  /**
   * state变量属性
   * modalVisible | 查看详情的Modal显隐 | Boolean
   * currentRow | 分页时的当前行数 | Number
   */
  state = {
    modalVisible: false,
    current: 1,
  };
  detailView = (record, index) => {
    const { dispatch } = this.props;
    const { current } = this.state;
    index = (current - 1) * pageSize + index;
    dispatch({
      type: 'dayReport/saveIndex',
      payload: index,
    });
    router.push(`/report/day/detail/${record.dailyReportTime.replace(/[-]/g, '')}?index=${index}`);
  };
  render() {
    const { reports, loading } = this.props;
    const { current } = this.state;
    return (
      <Table
        dataSource={reports}
        pagination={{ pageSize }}
        loading={loading}
        onChange={({ current }) => this.setState({ current })}
      >
        <Column title="日报时间" dataIndex="dailyReportTime" />
        <Column title="项目名" dataIndex="projectName" />
        <Column title="项目类型" dataIndex="projectType" />
        <Column title="输出物" dataIndex="output" />
        <Column title="实际完成时间" dataIndex="actualHours" render={val => `${val} 小时`} />
        <Column
          title="日报状态"
          dataIndex="status"
          render={val => <Badge status={statusMap[val]} text={status[val]} />}
        />
        <Column
          title="操作"
          dataIndex="action"
          render={(_, record, index) => <a onClick={() => this.detailView(record, index)}>详情</a>}
        />
      </Table>
    );
  }
}

export default StandardTable;
