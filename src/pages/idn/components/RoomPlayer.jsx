import Button from 'elements/Button';
import { isDesktop, isMobile } from 'react-device-detect';
import { FaUser } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { Badge } from 'reactstrap';
import formatNumber from 'utils/formatNumber';
import useWindowDimensions from 'utils/useWindowDimension';
import PlayerMulti from './PlayerMulti';

export const RoomPlayer = ({
  data,
  number,
  layout,
  setRoomOne,
  setRoomTwo,
  setRoomThree,
  setRoomFour,
}) => {
  const removeRoom = () => {
    if (number === '1') {
      setRoomOne('');
      localStorage.removeItem('roomOne');
    } else if (number === '2') {
      setRoomTwo('');
      localStorage.removeItem('roomTwo');
    } else if (number === '3') {
      setRoomThree('');
      localStorage.removeItem('roomThree');
    } else if (number === '4') {
      setRoomFour('');
      localStorage.removeItem('roomFour');
    }
  };

  return (
    <div className="mb-3">
      {data?.stream_url ? (
        <>
          <PlayerMulti
            number={number}
            url={`${process.env.REACT_APP_SERVICE_WORKER}?url=${data?.stream_url}`}
            idnUrl={`https://www.idn.app/${data?.user?.username}/live/${data.slug}`}
          />
          <div className="d-flex align-items-center">
            <h5 className="mr-2">
              <b>{data?.user?.name.replace('JKT48', '')}</b>
            </h5>
            <Button
              isPrimary
              style={{
                borderRadius: '6px',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
              }}
            >
              <FaUser size={14} className="mb-1" />
              {formatNumber(data?.view_count)}
            </Button>
            <Badge
              onClick={removeRoom}
              className="ml-2"
              style={{ cursor: 'pointer' }}
              color="danger"
            >
              <IoCloseCircle />
            </Badge>
          </div>
        </>
      ) : (
        <h4>Choose Room {number}</h4>
      )}
    </div>
  );
};

export default RoomPlayer;
