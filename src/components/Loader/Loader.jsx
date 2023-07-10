import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <RotatingLines strokeColor="#3f51b5" width="96" />;
    </LoaderContainer>
  );
};

export default Loader;
