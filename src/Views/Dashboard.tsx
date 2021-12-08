import {
  CalendarTwoTone,
  FolderTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tabs, Typography } from "antd";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import TableClass from "../Components/Dashboard/TableClassroom";
import TableUser from "../Components/Dashboard/TableUser";

const { TabPane } = Tabs;
const { Title, Text, Link } = Typography;

export default function Dashboard() {
  const database = getDatabase();
  const [numStudents, setNumStudents] = useState<number>(0);
  const [numTeachers, setNumTeachers] = useState<number>(0);
  const [numClasses, setNumClasses] = useState<number>(0);
  useEffect(() => {
    onValue(ref(database, `/students/`), (snapshot) => {
      const value = snapshot.size;
      setNumStudents(value);
    });
    onValue(ref(database, `/teachers/`), (snapshot) => {
      const value = snapshot.size;
      setNumTeachers(value);
    });
    onValue(ref(database, `/classroom/`), (snapshot) => {
      const value = snapshot.size;
      setNumClasses(value);
    });
  }, [database]);

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
      <Col xs={32} sm={32} md={8}>
        <Card bordered>
          <Statistic
            title="Teachers"
            value={numTeachers}
            prefix={<FolderTwoTone twoToneColor="#F63E4F" />}
          />
        </Card>
      </Col>
      <Col xs={32} sm={32} md={8}>
        <Card bordered>
          <Statistic
            title="Students"
            value={numStudents}
            prefix={<SmileTwoTone twoToneColor="#27C7FF" />}
          />
        </Card>
      </Col>
      <Col xs={32} sm={32} md={8}>
        <Card bordered>
          <Statistic
            title="Classrooms"
            value={numClasses}
            prefix={<CalendarTwoTone twoToneColor="#F63848" />}
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
                  <TableClass/>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
