import { Table } from "antd";
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

function TableClass(props: any) {
  const database = getDatabase();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const columns = [
    {
      title: "Name",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: number) => (
        <p style={{ marginBottom: 0 }}>
          {moment(createdAt).format("HH:mm DD/MM/YYYY")}
        </p>
      ),
    },
    {
      title: "Total students",
      dataIndex: "students",
      key: "students",
      render: (students: []) => (
        <p style={{ marginBottom: 0 }}>{students ? students.length : 0}</p>
      ),
    },
  ];

  const loadData = useCallback(
    (currentPage = 1) => {
      try {
        setLoading(true);
        onValue(
          query(ref(database, `/classroom`), orderByChild("createdAt")),
          (snapshot) => {
            const value = snapshot.val();
            setTotal(snapshot.size);

            setData(
              Object.keys(value).map((key, index) => ({
                ...value[key],
                key: index,
                createAt: moment().valueOf(),
              })).sort((a,b)=>b.createdAt - a.createdAt)
            );
          },
          {
            onlyOnce: true,
          }
        );
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    },
    [database]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <Table
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 5,
        total,
        onChange: (page) => loadData(page),
      }}
    />
  );
}

export default TableClass;
