import { Table } from "antd";
import { getDatabase, onValue, ref } from "firebase/database";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

function TableUser(props: { refDB: string }) {
  const database = getDatabase();
  const { refDB } = props;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CreateAt",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: number) => (
        <p style={{ marginBottom: 0 }}>
          {moment(createAt).format("HH:mm DD/MM/YYYY")}
        </p>
      ),
    },
  ];

  const loadData = useCallback(
    (currentPage = 1) => {
      try {
        console.log(currentPage);
        setLoading(true);
        onValue(
          ref(database, `/${refDB}/`),
          (snapshot) => {
            const value = snapshot.val();
            setData(
              Object.keys(value).map((key, index) => ({
                ...value[key],
                key: index,
                createAt: moment().valueOf(),
              }))
            );
          },
          {
            onlyOnce: true,
          }
        );
        setPage(currentPage + 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [database, refDB]
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
        defaultPageSize: 2,
        total: 50,
        onChange: (page) => loadData(page),
      }}
    />
  );
}

export default TableUser;
