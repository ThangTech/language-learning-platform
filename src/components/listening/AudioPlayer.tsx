import { SoundOutlined } from '@ant-design/icons';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  totalDuration?: number;
}

const toAudioUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  return url;
};

const AudioPlayer = ({
  src,
  title = 'Đoạn hội thoại',
}: AudioPlayerProps) => {
  const audioUrl = toAudioUrl(src);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary-fixed/20 border border-primary/10 rounded-[1.5rem] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <SoundOutlined className="text-xl text-primary" />
        </div>
        <div>
          <p className="font-headline font-bold text-on-surface">
            {audioUrl ? 'Đang phát' : 'Chưa có file âm thanh'}
          </p>
          <p className="text-xs text-on-surface-variant">
            {audioUrl ? title : 'Bài học này chưa có dữ liệu âm thanh.'}
          </p>
        </div>
      </div>

      {audioUrl ? (
        <audio
          controls
          src={audioUrl}
          className="w-full"
          style={{ height: 40 }}
        >
          Trình duyệt không hỗ trợ phát audio.
        </audio>
      ) : (
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-base">block</span>
          <span>Không có file âm thanh</span>
        </div>
      )}

      <p className="text-xs text-on-surface-variant">
        Sử dụng các nút điều khiển của trình duyệt để phát, tạm dừng, điều chỉnh âm lượng và tốc độ.
      </p>
    </div>
  );
};

export default AudioPlayer;
