import SpinnerGif from '../../assets/Spinner.gif';

export const Spinner = () => {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={SpinnerGif}
        alt='Spinner Image'
        style={{ width: 300, mixBlendMode: 'color-burn'}}
        className='d-block m-auto'
      />
    </div>
  );
};
