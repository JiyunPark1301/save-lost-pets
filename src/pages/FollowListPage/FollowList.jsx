import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import FollowListHeader from '../../components/common/Header/FollowListHeader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContextStore } from '../../context/AuthContext';
import Follow from '../../components/Follow/Follow';

const Main = styled.main`
  margin-top: 48px;
  padding: 24px 16px;
  overflow: auto;
`;

const FollowList = () => {
  const { accountname, type } = useParams();
  const { userToken } = useContext(AuthContextStore);
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    const getFollowList = async () => {
      try {
        const response = await fetch(`https://api.mandarin.weniv.co.kr/profile/${accountname}/${type}?limit=0`, {
          headers: { Authorization: `Bearer ${userToken}`, 'Content-type': 'application/json' },
        });

        const data = await response.json();
        console.log(data);
        setFollowList(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getFollowList();
  }, []);

  return (
    <Main>
      <FollowListHeader type={type === 'follower' ? 'Followers' : 'Followings'} />
      <Wrapper>
        <ul>
          {followList.map((item) => (
            <Follow key={item._id} item={item} />
          ))}
        </ul>
      </Wrapper>
    </Main>
  );
};

export default FollowList;
