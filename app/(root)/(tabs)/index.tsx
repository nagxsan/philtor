import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, Button} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/lib/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import seed from "@/lib/seed";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2,3,4]}
        renderItem={({item}) => <Card />}
        keyExtractor={(item, index) => item.toString()}
        numColumns={2}
        contentContainerClassName={"pb-32"}
        columnWrapperClassName={"flex gap-5 px-5"}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5 flex flex-col gap-y-5">
            <View className={"flex flex-row justify-between items-center mt-5"}>
              <View className={"flex flex-row items-center justify-center gap-x-3"}>
                <Image source={{ uri: user?.avatar}} className={"size-12 relative rounded-full"} />
                <View className={"flex flex-col items-start justify-center"}>
                  <Text className={"text-xs font-rubik text-black-100"}>Good Morning</Text>
                  <Text className={"text-base font-rubik-medium text-black-300"}>{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className={"size-6"} />
            </View>
            <Search />
            <View>
              <View className={"flex flex-row items-center justify-between"}>
                <Text className={"text-xl font-rubik-bold text-black-300"}>Featured</Text>
                <TouchableOpacity>
                  <Text className={"text-base font-rubik-bold text-primary-300"}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1,2,3]}
                renderItem={({item}) => <FeaturedCard />}
                keyExtractor={(item, index) => item.toString()}
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName={"flex gap-5 mt-5"}
              />
            </View>
            <View className={"flex flex-row items-center justify-between"}>
              <Text className={"text-xl font-rubik-bold text-black-300"}>Our recommendations</Text>
              <TouchableOpacity>
                <Text className={"text-base font-rubik-bold text-primary-300"}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
      
    </SafeAreaView>
  )
}
export default Home
