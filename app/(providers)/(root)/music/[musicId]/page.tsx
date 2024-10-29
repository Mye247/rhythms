import { api } from '@/api/spotifyApi';
import LikeButton from '@/components/LikeButton';
import PlayButton from '@/components/PlayButton';
import PlusButton from '@/components/PlusButton';
import dayjs from 'dayjs';
import Page from '../../_components/Page/Page';
import TrackDetailLyric from './_components/TrackDetailLyric';

interface MusicDetailPageProps {
  params: { musicId: string };
}

async function MusicDetailPage({ params: { musicId } }: MusicDetailPageProps) {
  const track = await api.track.getTrack(musicId);
  if (!track) return console.error('해당 트랙이 없습니다');

  const album = track?.album;
  const release_year = dayjs(track!.album.release_date).format('YYYY');
  const albumTitle = track?.album.name;
  const albumImg = track?.album.images[1].url;
  const artists = album?.artists[0].name;

  return (
    <Page>
      <div className="flex gap-x-6 py-4 border-b border-white mb-4 ">
        <div>
          <img src={albumImg} alt="앨범 이미지" />
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <h2 className="font-bold text-7xl whitespace-pre-wrap line-clamp-2">
            {track?.name}
          </h2>
          <div className="flex">
            <p>{artists}</p>
            <span className="px-3">•</span>
            <span>{albumTitle}</span>
            <span className="px-3">•</span>
            <span>{release_year}</span>
          </div>
          <div className="flex gap-x-4 items-center">
            <PlayButton track={track} />
            <LikeButton trackId={track.id} hasBorder={true} />
            <PlusButton trackUri={track.uri} />
          </div>
        </div>
      </div>
      <TrackDetailLyric trackId={musicId} />
    </Page>
  );
}

export default MusicDetailPage;
