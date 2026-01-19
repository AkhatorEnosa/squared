import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { SIZES } from '@/constants/sizes';
import { useCreatePost } from "@/hooks/useCreatePost"
import * as ImagePicker from 'expo-image-picker';
import { Image as ImageIcon } from 'lucide-react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Write = () => {
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const tabBarHeight = useBottomTabBarHeight()

    const router = useRouter()
    const { mutate, isPending, isSuccess } = useCreatePost();

    // image picker function 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    // Handle login logic here
    const handlePost = async () => {
        setIsLoading(true);
        try {
            if (title.trim() === '' || post.trim() === '') {
                setMessage('Please fill in all fields.');
                setIsLoading(false);
                return { success: false, error: 'Validation error' };
            }

            const formData = new FormData(); // Create a FormData object

            formData.append('title', title);
            formData.append('content', post);

            const uriParts = image?.split('.');
            const fileType = uriParts ? uriParts[uriParts.length - 1] : null;

            if (image) {
                const file = {
                    uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                } as any; // Cast to `any` to avoid type issues

                formData.append('imgUrl', file); // Append the image file to the FormData
            }


            // Call the createPost mutation
            mutate(formData, {
              onSuccess: (newPost) => {
                console.log(formData)
                  
                setMessage('Post published successfully!');
                setTitle('');
                setPost('');
                setImage(null);

                // Delay navigation slightly so user sees the success message
                router.replace('/(tabs)');
              },
              onError: (err) => {
                  setMessage(err.message || 'An error occurred. Please try again.');
              }
          });
        } catch (error) {
            setMessage('An error occurred. Please try again.' + error);
            return { success: false, error: 'Network error' };
        } finally {
            setIsLoading(false);
        }
    }
    
  return (
    <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: tabBarHeight }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Header title="Home" icon={true} identification={false} />
      <ScrollView
          contentContainerStyle={{
          flexGrow: 1,
          maxWidth: Platform.OS === 'web' ? 800 : undefined,
          alignSelf: Platform.OS === 'web' ? 'center' : undefined,
          paddingHorizontal: 15,
          paddingTop: 20,
          backgroundColor: COLORS.white,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
      >

          
          <Text style={{ fontSize: 25, color: COLORS.text, fontFamily: 'bold' }}>
             Share your thought on a particular subject with the world!
          </Text>

          {/* <View style={{ alignItems: 'center', marginVertical: 40 }}>
              <Image
                  source={require('../../assets/images/appImages/write.png')}
                  style={{ width: 322, height: 198, resizeMode: 'contain' }}
              />
          </View> */}

          {/* Form Section */}
          <View style={{ gap: 20, paddingHorizontal: 10, marginTop: 54 }}>
              {/* title Input */}
              <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.secondary,
                      borderColor: COLORS.primary,
                      borderWidth: 0.5,
                      borderRadius: 6,
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                  }}
              >
                  <TextInput
                      placeholder="Title"
                      keyboardType="default"
                      placeholderTextColor={COLORS.inputPlaceholder}
                      value={title}
                      onChangeText={setTitle}
                      autoCapitalize="none"
                      style={{
                          flex: 1,
                          color: COLORS.primary,
                          fontFamily: 'regular',
                          fontSize: SIZES.font,
                      }}
                      readOnly={isLoading}
                  />
              </View>

              {/* post Input */}
              <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      backgroundColor: COLORS.secondary,
                      borderColor: COLORS.primary,
                      borderWidth: 0.5,
                      borderRadius: 6,
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                  }}
              >
                  <TextInput
                      placeholder="Write your thought here..."
                      keyboardType="default"
                      placeholderTextColor={COLORS.inputPlaceholder}
                      value={post}
                      multiline={true}
                      numberOfLines={10}
                      onChangeText={setPost}
                      autoCapitalize="none"
                      style={{
                          flex: 1,
                          color: COLORS.primary,
                          textAlignVertical: 'top',
                          fontFamily: 'regular',
                          fontSize: SIZES.font,
                          height: 200,
                      }}
                      readOnly={isLoading}
                  />
              </View>
              
              <TouchableOpacity 
                onPress={pickImage}
                style={image && {
                    height: 200,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
              >
                {image ? (
                    <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <ImageIcon size={30} strokeWidth={0.75} color={COLORS.primary}/>
                        <Text style={{ color: COLORS.primary, fontFamily: 'regular' }}>Add a Cover Image</Text>
                    </View>
                )}
              </TouchableOpacity>

              {/* Publish Button */}
              <TouchableOpacity
                  style={{
                      backgroundColor: COLORS.primary,
                      paddingVertical: 18,
                      borderRadius: 6,
                      alignItems: 'center',
                      marginTop: 10,
                  }}
                  onPress={handlePost}
                  disabled={isLoading}
              >
                  {isLoading || isPending ? (
                      <ActivityIndicator color={COLORS.white} size={'small'} />
                  ) : (
                      <Text style={{ color: COLORS.white, fontFamily: 'medium', fontSize: SIZES.font}}>
                          Publish
                      </Text>
                  )}
              </TouchableOpacity>

              {/* Message */}
              {message !== '' && (
                  <Text
                      style={{
                          fontSize: 12,
                          fontFamily: 'medium',
                          color: isSuccess
                              ? COLORS.primary
                              : COLORS.error,
                          textAlign: 'center',
                          marginTop: 10,
                      }}
                  >
                      {message}
                  </Text>
              )}
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Write