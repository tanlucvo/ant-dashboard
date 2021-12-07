import {
    BugTwoTone,
    CalendarTwoTone,
    FolderTwoTone,
    SmileTwoTone
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tabs, Typography } from "antd";
import React from "react";
import TableUser from "../Components/Dashboard/TableUser";

const { TabPane } = Tabs;
const { Title, Text, Link } = Typography;

export default function Dashboard() { 

  return (
    <Row gutter={[16, 16]} style={{ height: "100%" }}>
      <Col span={24}>
        <Card bordered>
          <Title level={3}>Welcome to Ant Dashboard</Title>
          <Text>
            This admin dashboard template made with Ant Design and some others
            library. It will provide some default pages, sidenavs, and others.
            If you don't know about Ant Design, you could read about it{" "}
            <Link href="https://ant.design" target="_blank">
              in here
            </Link>
          </Text>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card bordered>
          <Statistic
            title="Teachers"
            value={23}
            prefix={<FolderTwoTone twoToneColor="#F63E4F" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card bordered>
          <Statistic
            title="Students"
            value={57}
            prefix={<SmileTwoTone twoToneColor="#27C7FF" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card bordered>
          <Statistic
            title="Classrooms"
            value={17}
            prefix={<CalendarTwoTone twoToneColor="#F63848" />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card bordered>
          <Statistic
            title="Attendences"
            value={87}
            prefix={<BugTwoTone twoToneColor="#117EFF" />}
            suffix={`/ 209`}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Card bordered>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Teachers" key="1">
                  <TableUser refDB="teachers" />
                </TabPane>
                <TabPane tab="Students" key="2">
                  <TableUser refDB="students" />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card bordered>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Classrooms" key="3">
                  <p>test</p>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
