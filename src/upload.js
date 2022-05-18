import ImageKit from 'imagekit'

export const imagekit = new ImageKit({
    publicKey: "public_VwILfKQntPWFOOdWNGO3s7RPV6Q=",
    privateKey: "private_Gp7ixEvZcvJ2jDQ7ARsMJGK1Fzo=",
    urlEndpoint: "https://ik.imagekit.io/neuraldown"
});

export async function upload_image(f) {
  const arr_buff = await f.arrayBuffer()
  const buff =  Buffer.from(new Uint8Array(arr_buff))
  const uploadResponse = await imagekit.upload({
    file: buff,
    fileName: f.name,
  })
  const url = uploadResponse.url
  return url
}
