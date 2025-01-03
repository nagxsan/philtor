import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";

const ProfileSetting = ({ icon, settingName } : { icon: any, settingName: string }) => {
  return (
    <TouchableOpacity className="flex flex-row ">
      <View>
        <Image source={icon} />
        <Text>{settingName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Profile = () => {
    return (
        <SafeAreaView className="h-full bg-white">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName={"pb-32 px-7"}
          >
            <View className="flex flex-row justify-between items-center my-3">
              <Text className="text-xl font-rubik-bold">
                Profile
              </Text>
              <Image source={icons.bell} className={"size-5"} />
            </View>
            <View className="flex flex-row justify-center my-2">
              <View className="flex flex-col items-center relative gap-y-3 my-2">
                <Image source={images.avatar} className={"size-44 relative rounded-full"} />
                <TouchableOpacity className={"absolute bottom-11 right-2"}>
                  <Image source={icons.edit} className={"size-9"} />
                </TouchableOpacity>
                <Text className={"text-2xl font-rubik-bold"}>Phil Dunphy</Text>
              </View>
            </View>
            <View className="flex flex-col mt-10">
              {/*<ProfileSetting icon={} settingName={} />*/}
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
