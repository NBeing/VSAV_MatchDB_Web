// import MatchInfoService from "@MatchService/MatchInfo.service";
import React from "react";
import { useForm } from "react-hook-form";
// import IMatchData from "@MatchService/MatchData.type";
import { CharNamesEnum, CharNamesEnumDisplay } from "@Common/enums/charNames.enum";
import { MatchLinkTypeEnum, MatchLinkTypeEnumDisplay } from "@Common/enums/matchLinkType.enum";


interface IFormInput {
    type: MatchLinkTypeEnum,
    url: string,
    char_1: CharNamesEnum | null,
    char_2: CharNamesEnum | null,
    p1_char: CharNamesEnum,
    p2_char: CharNamesEnum,
    p1_name?: string,
    p2_name?: string,
    winning_char: CharNamesEnum,
    // YT Data  
    video_title?: string,
    timestamp: number,
    uploader?: string,
    date_uploaded?: string
}


export default function AddMatch() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
  const onSubmit = (data:IFormInput) => {
    //   MatchInfoService.create(data)
    return console.log(data)
  }

  console.log(watch("char_1")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      
      <select {...register("type", {required:true})} >
        <option value=''>Content Type</option>
        <option value={MatchLinkTypeEnum.VI}>{MatchLinkTypeEnumDisplay.VI}</option>
        <option value={MatchLinkTypeEnum.FC2}>{MatchLinkTypeEnumDisplay.FC2} </option>
      </select>
      <label> URL
         <input {...register("url", { required: true })} />
      </label>
      <input {...register("timestamp", { required: false })} />

      <select {...register("char_1", {required:true})} >
        <option value=''>Choose P2 Character</option>
        <option value={CharNamesEnum.AN}>{CharNamesEnumDisplay.AN}</option>
        <option value={CharNamesEnum.AU}>{CharNamesEnumDisplay.AU}</option>
        <option value={CharNamesEnum.BI}>{CharNamesEnumDisplay.BI}</option>
        <option value={CharNamesEnum.BU}>{CharNamesEnumDisplay.BU}</option>
        <option value={CharNamesEnum.DE}>{CharNamesEnumDisplay.DE}</option>
        <option value={CharNamesEnum.FE}>{CharNamesEnumDisplay.FE}</option>
        <option value={CharNamesEnum.GA}>{CharNamesEnumDisplay.GA}</option>
        <option value={CharNamesEnum.JE}>{CharNamesEnumDisplay.JE}</option>
        <option value={CharNamesEnum.LE}>{CharNamesEnumDisplay.LE}</option>
        <option value={CharNamesEnum.LI}>{CharNamesEnumDisplay.LI}</option>
        <option value={CharNamesEnum.MO}>{CharNamesEnumDisplay.MO}</option>
        <option value={CharNamesEnum.SA}>{CharNamesEnumDisplay.SA}</option>
        <option value={CharNamesEnum.VI}>{CharNamesEnumDisplay.VI}</option>
        <option value={CharNamesEnum.QB}>{CharNamesEnumDisplay.QB}</option>
        <option value={CharNamesEnum.ZA}>{CharNamesEnumDisplay.ZA}</option>
      </select>

      <select {...register("char_2", {required:true})} >
        <option value=''>Choose P1 Character</option>
        <option value={CharNamesEnum.AN}>{CharNamesEnumDisplay.AN}</option>
        <option value={CharNamesEnum.AU}>{CharNamesEnumDisplay.AU}</option>
        <option value={CharNamesEnum.BI}>{CharNamesEnumDisplay.BI}</option>
        <option value={CharNamesEnum.BU}>{CharNamesEnumDisplay.BU}</option>
        <option value={CharNamesEnum.DE}>{CharNamesEnumDisplay.DE}</option>
        <option value={CharNamesEnum.FE}>{CharNamesEnumDisplay.FE}</option>
        <option value={CharNamesEnum.GA}>{CharNamesEnumDisplay.GA}</option>
        <option value={CharNamesEnum.JE}>{CharNamesEnumDisplay.JE}</option>
        <option value={CharNamesEnum.LE}>{CharNamesEnumDisplay.LE}</option>
        <option value={CharNamesEnum.LI}>{CharNamesEnumDisplay.LI}</option>
        <option value={CharNamesEnum.MO}>{CharNamesEnumDisplay.MO}</option>
        <option value={CharNamesEnum.SA}>{CharNamesEnumDisplay.SA}</option>
        <option value={CharNamesEnum.VI}>{CharNamesEnumDisplay.VI}</option>
        <option value={CharNamesEnum.QB}>{CharNamesEnumDisplay.QB}</option>
        <option value={CharNamesEnum.ZA}>{CharNamesEnumDisplay.ZA}</option>
      </select>
      <select {...register("winning_char", {required:true})} >
        <option value=''>Choose Winning Character</option>
        <option value={CharNamesEnum.AN}>{CharNamesEnumDisplay.AN}</option>
        <option value={CharNamesEnum.AU}>{CharNamesEnumDisplay.AU}</option>
        <option value={CharNamesEnum.BI}>{CharNamesEnumDisplay.BI}</option>
        <option value={CharNamesEnum.BU}>{CharNamesEnumDisplay.BU}</option>
        <option value={CharNamesEnum.DE}>{CharNamesEnumDisplay.DE}</option>
        <option value={CharNamesEnum.FE}>{CharNamesEnumDisplay.FE}</option>
        <option value={CharNamesEnum.GA}>{CharNamesEnumDisplay.GA}</option>
        <option value={CharNamesEnum.JE}>{CharNamesEnumDisplay.JE}</option>
        <option value={CharNamesEnum.LE}>{CharNamesEnumDisplay.LE}</option>
        <option value={CharNamesEnum.LI}>{CharNamesEnumDisplay.LI}</option>
        <option value={CharNamesEnum.MO}>{CharNamesEnumDisplay.MO}</option>
        <option value={CharNamesEnum.SA}>{CharNamesEnumDisplay.SA}</option>
        <option value={CharNamesEnum.VI}>{CharNamesEnumDisplay.VI}</option>
        <option value={CharNamesEnum.QB}>{CharNamesEnumDisplay.QB}</option>
        <option value={CharNamesEnum.ZA}>{CharNamesEnumDisplay.ZA}</option>
      </select>
      <input {...register("video_title", { required: false })} />
      <input {...register("uploader", { required: false })} />
      <input {...register("date_uploaded", { required: false })} />

      {/* errors will return when field validation fails  */}
      {errors.char_1 && <span>This field is required</span>}
      {errors.char_2 && <span>This field is required</span>}
      {errors.winning_char && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}