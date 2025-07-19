// import React from 'react';
// import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

// const musicData = [
//   {
//     id: '1',
//     title: 'Blinding Lights',
//     artist: 'The Weeknd',
//     duration: '3:20',
//     albumArt: 'https://i.scdn.co/image/ab67616d0000b2734c6c716c8a4dd4d2e6b6a5f6',
//   },
//   {
//     id: '2',
//     title: 'Levitating',
//     artist: 'Dua Lipa',
//     duration: '3:23',
//     albumArt: 'https://i.scdn.co/image/ab67616d0000b273e92a7be1fa2adba8e0e4e5d4',
//   },
//   {
//     id: '3',
//     title: 'Save Your Tears',
//     artist: 'The Weeknd',
//     duration: '3:35',
//     albumArt: 'https://i.scdn.co/image/ab67616d0000b273c2f4c98d06446a11f7e2fca4',
//   },
// ];

// const MusicList = () => {
//   const renderItem = ({ item }: { item: typeof musicData[0] }) => (
//     <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
//       <Image
//         source={{ uri: item.albumArt }}
//         className="w-16 h-16 rounded-md"
//       />
//       <View className="flex-1 ml-4">
//         <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
//         <Text className="text-gray-500 mt-1">{item.artist}</Text>
//       </View>
//       <Text className="text-gray-400">{item.duration}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-white">
//       <FlatList
//         data={musicData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// export default MusicList;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

// interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   duration: string;
//   albumArt: string;
// }

// const MusicList = () => {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchSongs() {
//       try {
//         const res = await axios.get('https://api.deezer.com/search?q=brunomar');
//         const fetchedSongs: Song[] = res.data.data.map((item: any) => ({
//           id: item.id.toString(),
//           title: item.title,
//           artist: item.artist.name,
//           duration: formatDuration(item.duration),
//           albumArt: item.album.cover_medium,
//         }));
//         setSongs(fetchedSongs);
//       } catch (error) {
//         console.log('Error fetching music:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSongs();
//   }, []);

//   // Helper: convert seconds to mm:ss
//   function formatDuration(seconds: number) {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   }

//   const renderItem = ({ item }: { item: Song }) => (
//     <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
//       <Image source={{ uri: item.albumArt }} className="w-16 h-16 rounded-md" />
//       <View className="flex-1 ml-4">
//         <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
//         <Text className="text-gray-500 mt-1">{item.artist}</Text>
//       </View>
//       <Text className="text-gray-400">{item.duration}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#0061FF" />
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white">
//       <FlatList
//         data={songs}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// export default MusicList;



import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumArt: string;
  preview: string; // URL to play
}

const MusicList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await axios.get('https://api.deezer.com/search?q=bellieellish');
        const fetchedSongs: Song[] = res.data.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          artist: item.artist.name,
          duration: formatDuration(item.duration),
          albumArt: item.album.cover_medium,
          preview: item.preview, // 30s audio preview
        }));
        setSongs(fetchedSongs);
      } catch (error) {
        console.log('Error fetching music:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();

    // Cleanup on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  function formatDuration(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const handlePlay = async (song: Song) => {
    try {
      // Stop and unload the current sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // If the clicked song is already playing, stop it
      if (playingId === song.id) {
        setPlayingId(null);
        return;
      }

      // Load and play new sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: song.preview },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setPlayingId(song.id);

      // Auto stop after finish
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Playback error:', error);
    }
  };

  const renderItem = ({ item }: { item: Song }) => (
    <View className="flex-row items-center p-4 border-b border-gray-200">
      <Image source={{ uri: item.albumArt }} className="w-16 h-16 rounded-md" />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-900">{item.title}</Text>
        <Text className="text-gray-500 mt-1">{item.artist}</Text>
      </View>
      <Text className="text-gray-400 mr-2">{item.duration}</Text>
      <TouchableOpacity onPress={() => handlePlay(item)}>
        <Ionicons
          name={playingId === item.id ? 'pause-circle' : 'play-circle'}
          size={32}
          color={playingId === item.id ? '#0061FF' : '#555'}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0061FF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MusicList;

