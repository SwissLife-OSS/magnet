using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;

namespace Magnet.Store.Mongo
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            this.CreateMap<MagnetMessage, MessageRecord>();
        }
    }
}
