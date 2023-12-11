import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  buttonContainer: {
    position: "relative",
    flexDirection: "row",
    columnGap: 5,

    justifyContent: "center",
    columnGap: 25,
    width: "80%",
  },
  ctrlButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#7986CB",
  },
  previewContainer: {
    flex: 1,
    rowGap: 10,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#512DA8",
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 200,
    borderRadius: 5,
  },
  shotButton: {
    width: 70,
    height: 70,
    backgroundColor: "red",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
  closeCamera: {
    position: "absolute",
    right: 30,
    top: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "white",
    width: 40,
    height: 40,
  },
  btnText: {
    color: "white",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
