import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, Image, TextInput, Text } from "react-native";

import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import { theme } from "../../theme";

import { captureScreen } from "react-native-view-shot";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { api } from "../../libs/api";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackCanceled: () => void;
}

export function Form({
  feedbackType,
  onFeedbackSent,
  onFeedbackCanceled,
}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot,
        comment,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image}></Image>
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
