using RestSharp;

namespace Sandbox
{
    public class FootballClient
    {
        private const string BaseUrl = "http://api.football-data.org/v2/";
        private const string ApiKey = "09d73ff5f33c424c8b294e315dfca0d0";

        private readonly RestClient client;
        private RestRequest request;

        public FootballClient()
        {
            this.client = new RestClient(BaseUrl);
        }

        public T Get<T>(string url, int id) where T : new()
        {
            this.request = new RestRequest(url);

            this.request.AddUrlSegment("id", id);
            this.request.AddHeader("X-Auth-Token", ApiKey);

            IRestResponse<T> response = this.client.Execute<T>(this.request);

            return response.Data;
        }
    }
}
