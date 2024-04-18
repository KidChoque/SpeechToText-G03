import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AudioVisu, Box, BoxChat, BoxClose, BoxMic, ChatBox, Container, ContenChat, Content, ContentChat, ConvertText, Footer, Gif, Picture } from './Style';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Nunito_600SemiBold, useFonts } from '@expo-google-fonts/nunito';
import { Audio } from 'expo-av';

export default function App() {
  const [chatClicked, setChatClicked] = useState()
  const [isClicked, setIsClicked] = useState()
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
const iconSize = isClicked ? 60 : 50;
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  })
  if (!fontsLoaded ) {
    return null;
  }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);


  


  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsClicked(true)

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    setIsClicked(false)
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( 
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  
  
  return (
    <Container>
      <Content>
        <AudioVisu>
          {
            isClicked ?
              <Gif source={require("../front-end/assets/gif.gif")} />
              :
              <>
                <Picture source={require("../front-end/assets/logo.png")} />
              </>
          }
        </AudioVisu>
        
        <ConvertText>texto convertido</ConvertText>

        {
          chatClicked ?
            <>
              <ContenChat>

                <Box onPress={() => setChatClicked(false)}>
                  <AntDesign name="closecircleo" size={30} color="white" />
                </Box>

                <ChatBox placeholder="Digite aqui" placeholderTextColor="white" />

                <Box>
                  <FontAwesome name="send" size={30} color="#b1a7f2" />
                </Box>

              </ContenChat>

            </>
            :
            <Footer>
              {
                isClicked ?
                  <></>
                  :
                  <Box onPress={() => setChatClicked(true)}>
                    <Ionicons name="chatbox" size={45} color="#b1a7f2" />
                  </Box>
              }

              {
                isClicked ?
                  <Box onPress={() => setIsClicked(false)}>
                    <AntDesign name="closecircleo" size={30} color="white" />
                  </Box>
                  :
                  <></>
              }
              <Box onPress={() => isClicked == true ? stopRecording() : startRecording()}>
                <FontAwesome name="microphone"
                  size={iconSize} color="#c785f2" />
              </Box>

            </Footer>
        }



      </Content>

    </Container>


  );
}


