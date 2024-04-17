import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AudioVisu, Box, BoxChat, BoxClose, BoxMic, ChatBox, Container, ContenChat, Content, ContentChat, ConvertText, Footer, Gif, Picture } from './Style';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Nunito_600SemiBold, useFonts } from '@expo-google-fonts/nunito';

export default function App() {

  const [isClicked, setIsClicked] = useState()

  const iconSize = isClicked ? 60 : 50;

  const [chatClicked, setChatClicked] = useState()

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  })
  if (!fontsLoaded ) {
    return null;
  }

  
  return (
    <Container>
      <Content>
        <AudioVisu>
          {
            isClicked ?
              <Gif source={require("../speech-to-textG03/assets/gif.gif")} />
              :
              <>
                <Picture source={require("../speech-to-textG03/assets/logo.png")} />
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
              <Box onPress={() => setIsClicked(true)}>
                <FontAwesome name="microphone"
                  size={iconSize} color="#c785f2" />
              </Box>

            </Footer>
        }



      </Content>

    </Container>


  );
}


