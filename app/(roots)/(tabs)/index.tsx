import MusicList from '@/components/music-list';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <MusicList />
    </SafeAreaView>
  );
}
