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
